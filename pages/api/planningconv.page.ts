import { NextApiRequest, NextApiResponse } from 'next';

import { ensureHasValidSession, getUserHash } from '@/utils/server/auth';

import { PlanningRequest, PlanningResponse } from '@/types/agent';

import { executeReactAgent } from '@/agent/agentConvo';
import { createContext } from '@/agent/plugins/executor';
import path from 'node:path';
import { v4 } from 'uuid';
import { getErrorResponseBody } from '@/utils/server/error';
import { verifyUserLlmUsage } from '@/utils/server/llmUsage';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Vercel Hack
  // https://github.com/orgs/vercel/discussions/1278
  // eslint-disable-next-line no-unused-vars
  const vercelFunctionHack = path.resolve('./public', '');

  if (!(await ensureHasValidSession(req, res))) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = await getUserHash(req, res);

  try {
    const {
      modelId,
      messages,
      enabledToolNames,
      pluginResults: toolActionResults,
    } = req.body as PlanningRequest;

    await verifyUserLlmUsage(userId, modelId);

    let { taskId } = req.body;
    if (!taskId) {
      taskId = v4();
    }

    const lastMessage = messages[messages.length - 1];
    const verbose = process.env.DEBUG_AGENT_LLM_LOGGING === 'true';
    const context = await createContext(taskId, req, res, modelId, verbose);
    const result = await executeReactAgent(
      context,
      enabledToolNames,
      messages.slice(0, messages.length - 1),
      lastMessage.content,
      toolActionResults,
      verbose,
    );
    const responseJson = {
      result,
      taskId,
    } as PlanningResponse;
    res.status(200).json(responseJson);
  } catch (error) {
    console.error(error);
    const errorRes = getErrorResponseBody(error);
    res.status(500).json(errorRes);
  }
};

export default handler;
