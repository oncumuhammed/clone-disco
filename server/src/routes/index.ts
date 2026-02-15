/**
 * Main router that mounts all route modules.
 * Aggregates all API routes under their respective paths.
 */
import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { userRouter } from './user.routes.js';
import { serverRouter } from './server.routes.js';
import { channelRouter } from './channel.routes.js';
import { messageRouter } from './message.routes.js';
import { roleRouter } from './role.routes.js';
import { inviteRouter } from './invite.routes.js';
import { memberRouter } from './member.routes.js';
import { friendRouter } from './friend.routes.js';
import { dmRouter } from './dm.routes.js';
import { emojiRouter } from './emoji.routes.js';
import { reactionRouter } from './reaction.routes.js';
import { webhookRouter } from './webhook.routes.js';
import { voiceRouter } from './voice.routes.js';

export const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/servers', serverRouter);
router.use('/channels', channelRouter);
router.use('/messages', messageRouter);
router.use('/roles', roleRouter);
router.use('/invites', inviteRouter);
router.use('/members', memberRouter);
router.use('/friends', friendRouter);
router.use('/dm', dmRouter);
router.use('/emojis', emojiRouter);
router.use('/reactions', reactionRouter);
router.use('/webhooks', webhookRouter);
router.use('/voice', voiceRouter);
