/**
 * Database seed script for Concord Discord clone.
 * Creates initial test data including users, servers, channels, roles, messages, and more.
 * This script is idempotent and can be run multiple times safely.
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const Permissions = {
  VIEW_CHANNEL: 1n << 0n,
  SEND_MESSAGES: 1n << 1n,
  SEND_TTS_MESSAGES: 1n << 2n,
  MANAGE_MESSAGES: 1n << 3n,
  EMBED_LINKS: 1n << 4n,
  ATTACH_FILES: 1n << 5n,
  READ_MESSAGE_HISTORY: 1n << 6n,
  MENTION_EVERYONE: 1n << 7n,
  USE_EXTERNAL_EMOJIS: 1n << 8n,
  ADD_REACTIONS: 1n << 9n,
  CONNECT: 1n << 10n,
  SPEAK: 1n << 11n,
  MUTE_MEMBERS: 1n << 12n,
  DEAFEN_MEMBERS: 1n << 13n,
  MOVE_MEMBERS: 1n << 14n,
  USE_VAD: 1n << 15n,
  STREAM: 1n << 16n,
  USE_SOUNDBOARD: 1n << 17n,
  CREATE_INVITE: 1n << 18n,
  KICK_MEMBERS: 1n << 19n,
  BAN_MEMBERS: 1n << 20n,
  ADMINISTRATOR: 1n << 21n,
  MANAGE_CHANNELS: 1n << 22n,
  MANAGE_SERVER: 1n << 23n,
  CHANGE_NICKNAME: 1n << 24n,
  MANAGE_NICKNAMES: 1n << 25n,
  MANAGE_ROLES: 1n << 26n,
  MANAGE_WEBHOOKS: 1n << 27n,
  MANAGE_EMOJIS: 1n << 28n,
} as const;

async function main() {
  console.log('🌱 Starting database seed...');

  console.log('🧹 Cleaning existing data...');
  await prisma.reaction.deleteMany();
  await prisma.mention.deleteMany();
  await prisma.embed.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.message.deleteMany();
  await prisma.readState.deleteMany();
  await prisma.voiceState.deleteMany();
  await prisma.dmChannelMember.deleteMany();
  await prisma.permissionOverride.deleteMany();
  await prisma.invite.deleteMany();
  await prisma.ban.deleteMany();
  await prisma.webhook.deleteMany();
  await prisma.customEmoji.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.serverMember.deleteMany();
  await prisma.role.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.channelCategory.deleteMany();
  await prisma.friendRequest.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.server.deleteMany();
  await prisma.user.deleteMany();

  console.log('👥 Creating users...');
  const passwordHash = await bcrypt.hash('Password123!', 12);

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      discriminator: '0001',
      email: 'admin@concord.app',
      passwordHash,
      status: 'ONLINE',
      bio: 'Server administrator',
      isEmailVerified: true,
    },
  });

  const alice = await prisma.user.create({
    data: {
      username: 'alice',
      discriminator: '1234',
      email: 'alice@example.com',
      passwordHash,
      status: 'ONLINE',
      bio: 'Hey there! I\'m using Concord',
      isEmailVerified: true,
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: 'bob',
      discriminator: '5678',
      email: 'bob@example.com',
      passwordHash,
      status: 'IDLE',
      bio: 'Gaming enthusiast',
      isEmailVerified: true,
    },
  });

  const charlie = await prisma.user.create({
    data: {
      username: 'charlie',
      discriminator: '9012',
      email: 'charlie@example.com',
      passwordHash,
      status: 'DND',
      bio: 'Do not disturb',
      isEmailVerified: true,
    },
  });

  const diana = await prisma.user.create({
    data: {
      username: 'diana',
      discriminator: '3456',
      email: 'diana@example.com',
      passwordHash,
      status: 'OFFLINE',
      bio: 'Music lover 🎵',
      isEmailVerified: true,
    },
  });

  console.log('🏢 Creating servers...');
  const concordCommunity = await prisma.server.create({
    data: {
      name: 'Concord Community',
      description: 'Official Concord community server',
      ownerId: admin.id,
      isPublic: true,
      category: 'COMMUNITY',
    },
  });

  const gamingHub = await prisma.server.create({
    data: {
      name: 'Gaming Hub',
      description: 'A place for gamers to hang out',
      ownerId: alice.id,
      isPublic: true,
      category: 'GAMING',
    },
  });

  console.log('👑 Creating roles...');
  const everyonePerms =
    Permissions.VIEW_CHANNEL |
    Permissions.SEND_MESSAGES |
    Permissions.READ_MESSAGE_HISTORY |
    Permissions.ADD_REACTIONS |
    Permissions.CONNECT |
    Permissions.SPEAK |
    Permissions.CHANGE_NICKNAME;

  const moderatorPerms =
    everyonePerms |
    Permissions.MANAGE_MESSAGES |
    Permissions.KICK_MEMBERS |
    Permissions.BAN_MEMBERS |
    Permissions.MANAGE_CHANNELS |
    Permissions.MANAGE_NICKNAMES;

  const adminPerms = Permissions.ADMINISTRATOR;

  const concordEveryoneRole = await prisma.role.create({
    data: {
      name: '@everyone',
      serverId: concordCommunity.id,
      permissions: everyonePerms,
      position: 0,
      color: 0,
      isDefault: true,
    },
  });

  const concordModRole = await prisma.role.create({
    data: {
      name: 'Moderator',
      serverId: concordCommunity.id,
      permissions: moderatorPerms,
      position: 1,
      color: 0x5865f2,
      isHoisted: true,
      isMentionable: true,
    },
  });

  const concordAdminRole = await prisma.role.create({
    data: {
      name: 'Admin',
      serverId: concordCommunity.id,
      permissions: adminPerms,
      position: 2,
      color: 0xed4245,
      isHoisted: true,
      isMentionable: true,
    },
  });

  const gamingEveryoneRole = await prisma.role.create({
    data: {
      name: '@everyone',
      serverId: gamingHub.id,
      permissions: everyonePerms,
      position: 0,
      color: 0,
      isDefault: true,
    },
  });

  const gamingModRole = await prisma.role.create({
    data: {
      name: 'Moderator',
      serverId: gamingHub.id,
      permissions: moderatorPerms,
      position: 1,
      color: 0x5865f2,
      isHoisted: true,
      isMentionable: true,
    },
  });

  const gamingAdminRole = await prisma.role.create({
    data: {
      name: 'Admin',
      serverId: gamingHub.id,
      permissions: adminPerms,
      position: 2,
      color: 0xed4245,
      isHoisted: true,
      isMentionable: true,
    },
  });

  console.log('📁 Creating channel categories and channels for Concord Community...');
  const welcomeCategory = await prisma.channelCategory.create({
    data: {
      name: 'WELCOME',
      position: 0,
      serverId: concordCommunity.id,
    },
  });

  const rulesChannel = await prisma.channel.create({
    data: {
      name: 'rules',
      type: 'TEXT',
      position: 0,
      topic: 'Server rules and guidelines',
      serverId: concordCommunity.id,
      categoryId: welcomeCategory.id,
    },
  });

  const announcementsChannel = await prisma.channel.create({
    data: {
      name: 'announcements',
      type: 'ANNOUNCEMENT',
      position: 1,
      topic: 'Important announcements',
      serverId: concordCommunity.id,
      categoryId: welcomeCategory.id,
    },
  });

  const generalCategory = await prisma.channelCategory.create({
    data: {
      name: 'GENERAL',
      position: 1,
      serverId: concordCommunity.id,
    },
  });

  const generalChannel = await prisma.channel.create({
    data: {
      name: 'general',
      type: 'TEXT',
      position: 0,
      topic: 'General discussion',
      serverId: concordCommunity.id,
      categoryId: generalCategory.id,
    },
  });

  const offTopicChannel = await prisma.channel.create({
    data: {
      name: 'off-topic',
      type: 'TEXT',
      position: 1,
      topic: 'Anything goes',
      serverId: concordCommunity.id,
      categoryId: generalCategory.id,
    },
  });

  const mediaChannel = await prisma.channel.create({
    data: {
      name: 'media',
      type: 'TEXT',
      position: 2,
      topic: 'Share images, videos, and links',
      isNsfw: false,
      serverId: concordCommunity.id,
      categoryId: generalCategory.id,
    },
  });

  const voiceCategory = await prisma.channelCategory.create({
    data: {
      name: 'VOICE CHANNELS',
      position: 2,
      serverId: concordCommunity.id,
    },
  });

  const generalVoiceChannel = await prisma.channel.create({
    data: {
      name: 'General Voice',
      type: 'VOICE',
      position: 0,
      serverId: concordCommunity.id,
      categoryId: voiceCategory.id,
    },
  });

  const musicVoiceChannel = await prisma.channel.create({
    data: {
      name: 'Music',
      type: 'VOICE',
      position: 1,
      serverId: concordCommunity.id,
      categoryId: voiceCategory.id,
    },
  });

  const gamingVoiceChannel = await prisma.channel.create({
    data: {
      name: 'Gaming',
      type: 'VOICE',
      position: 2,
      serverId: concordCommunity.id,
      categoryId: voiceCategory.id,
    },
  });

  const streamRoomChannel = await prisma.channel.create({
    data: {
      name: 'Stream Room',
      type: 'VIDEO',
      position: 3,
      serverId: concordCommunity.id,
      categoryId: voiceCategory.id,
    },
  });

  console.log('📁 Creating channel categories and channels for Gaming Hub...');
  const infoCategory = await prisma.channelCategory.create({
    data: {
      name: 'INFO',
      position: 0,
      serverId: gamingHub.id,
    },
  });

  const welcomeChannel = await prisma.channel.create({
    data: {
      name: 'welcome',
      type: 'TEXT',
      position: 0,
      serverId: gamingHub.id,
      categoryId: infoCategory.id,
    },
  });

  const rolesChannel = await prisma.channel.create({
    data: {
      name: 'roles',
      type: 'TEXT',
      position: 1,
      serverId: gamingHub.id,
      categoryId: infoCategory.id,
    },
  });

  const chatCategory = await prisma.channelCategory.create({
    data: {
      name: 'CHAT',
      position: 1,
      serverId: gamingHub.id,
    },
  });

  const generalChatChannel = await prisma.channel.create({
    data: {
      name: 'general-chat',
      type: 'TEXT',
      position: 0,
      serverId: gamingHub.id,
      categoryId: chatCategory.id,
    },
  });

  const gameDiscussionChannel = await prisma.channel.create({
    data: {
      name: 'game-discussion',
      type: 'TEXT',
      position: 1,
      serverId: gamingHub.id,
      categoryId: chatCategory.id,
    },
  });

  const lfgChannel = await prisma.channel.create({
    data: {
      name: 'looking-for-group',
      type: 'TEXT',
      position: 2,
      serverId: gamingHub.id,
      categoryId: chatCategory.id,
    },
  });

  const voiceCategoryGaming = await prisma.channelCategory.create({
    data: {
      name: 'VOICE',
      position: 2,
      serverId: gamingHub.id,
    },
  });

  const lobbyChannel = await prisma.channel.create({
    data: {
      name: 'Lobby',
      type: 'VOICE',
      position: 0,
      serverId: gamingHub.id,
      categoryId: voiceCategoryGaming.id,
    },
  });

  const team1Channel = await prisma.channel.create({
    data: {
      name: 'Team 1',
      type: 'VOICE',
      position: 1,
      serverId: gamingHub.id,
      categoryId: voiceCategoryGaming.id,
    },
  });

  const team2Channel = await prisma.channel.create({
    data: {
      name: 'Team 2',
      type: 'VOICE',
      position: 2,
      serverId: gamingHub.id,
      categoryId: voiceCategoryGaming.id,
    },
  });

  console.log('👤 Creating server members...');
  const concordAdminMember = await prisma.serverMember.create({
    data: {
      userId: admin.id,
      serverId: concordCommunity.id,
      roles: {
        connect: [{ id: concordEveryoneRole.id }, { id: concordAdminRole.id }],
      },
    },
  });

  const concordAliceMember = await prisma.serverMember.create({
    data: {
      userId: alice.id,
      serverId: concordCommunity.id,
      roles: {
        connect: [{ id: concordEveryoneRole.id }, { id: concordModRole.id }],
      },
    },
  });

  const concordBobMember = await prisma.serverMember.create({
    data: {
      userId: bob.id,
      serverId: concordCommunity.id,
      roles: {
        connect: [{ id: concordEveryoneRole.id }, { id: concordModRole.id }],
      },
    },
  });

  const concordCharlieMember = await prisma.serverMember.create({
    data: {
      userId: charlie.id,
      serverId: concordCommunity.id,
      roles: {
        connect: [{ id: concordEveryoneRole.id }],
      },
    },
  });

  const concordDianaMember = await prisma.serverMember.create({
    data: {
      userId: diana.id,
      serverId: concordCommunity.id,
      roles: {
        connect: [{ id: concordEveryoneRole.id }],
      },
    },
  });

  const gamingAdminMember = await prisma.serverMember.create({
    data: {
      userId: admin.id,
      serverId: gamingHub.id,
      roles: {
        connect: [{ id: gamingEveryoneRole.id }],
      },
    },
  });

  const gamingAliceMember = await prisma.serverMember.create({
    data: {
      userId: alice.id,
      serverId: gamingHub.id,
      roles: {
        connect: [{ id: gamingEveryoneRole.id }, { id: gamingAdminRole.id }],
      },
    },
  });

  const gamingBobMember = await prisma.serverMember.create({
    data: {
      userId: bob.id,
      serverId: gamingHub.id,
      roles: {
        connect: [{ id: gamingEveryoneRole.id }, { id: gamingModRole.id }],
      },
    },
  });

  const gamingCharlieMember = await prisma.serverMember.create({
    data: {
      userId: charlie.id,
      serverId: gamingHub.id,
      roles: {
        connect: [{ id: gamingEveryoneRole.id }],
      },
    },
  });

  const gamingDianaMember = await prisma.serverMember.create({
    data: {
      userId: diana.id,
      serverId: gamingHub.id,
      roles: {
        connect: [{ id: gamingEveryoneRole.id }],
      },
    },
  });

  console.log('📊 Updating server member counts...');
  await prisma.server.update({
    where: { id: concordCommunity.id },
    data: { memberCount: 5 },
  });

  await prisma.server.update({
    where: { id: gamingHub.id },
    data: { memberCount: 5 },
  });

  console.log('👫 Creating friend requests...');
  await prisma.friendRequest.create({
    data: {
      senderId: admin.id,
      receiverId: alice.id,
      status: 'ACCEPTED',
    },
  });

  await prisma.friendRequest.create({
    data: {
      senderId: alice.id,
      receiverId: bob.id,
      status: 'ACCEPTED',
    },
  });

  await prisma.friendRequest.create({
    data: {
      senderId: charlie.id,
      receiverId: diana.id,
      status: 'PENDING',
    },
  });

  await prisma.friendRequest.create({
    data: {
      senderId: bob.id,
      receiverId: charlie.id,
      status: 'PENDING',
    },
  });

  console.log('💬 Creating messages in #general...');
  const welcomeMessage = await prisma.message.create({
    data: {
      content: 'Welcome to Concord Community! 🎉',
      authorId: admin.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T10:00:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'Thanks for having me! This looks amazing!',
      authorId: alice.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T10:05:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'Hey everyone! Excited to be here 😊',
      authorId: bob.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T10:10:00Z'),
    },
  });

  const markdownMessage = await prisma.message.create({
    data: {
      content:
        'Here are some **formatting** examples:\n\n- *Italic text*\n- **Bold text**\n- `inline code`\n\n```javascript\nconst hello = "world";\nconsole.log(hello);\n```',
      authorId: alice.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T10:15:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'That markdown formatting looks great!',
      authorId: bob.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      replyToId: markdownMessage.id,
      createdAt: new Date('2024-01-01T10:20:00Z'),
    },
  });

  const pinnedMessage = await prisma.message.create({
    data: {
      content: '📌 Important: Please read the rules in #rules before posting!',
      authorId: admin.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      isPinned: true,
      createdAt: new Date('2024-01-01T10:25:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'charlie joined the server.',
      authorId: charlie.id,
      channelId: generalChannel.id,
      type: 'SYSTEM_JOIN',
      createdAt: new Date('2024-01-01T10:30:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'Hi Charlie! Welcome aboard!',
      authorId: alice.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T10:35:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'Thanks! Happy to be here.',
      authorId: charlie.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T10:40:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'diana joined the server.',
      authorId: diana.id,
      channelId: generalChannel.id,
      type: 'SYSTEM_JOIN',
      createdAt: new Date('2024-01-01T10:45:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'Hello everyone! 👋',
      authorId: diana.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T10:50:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'Welcome Diana! Good to see you here.',
      authorId: bob.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T10:55:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'Anyone up for some gaming later?',
      authorId: bob.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T11:00:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'I\'m in! What game are we playing?',
      authorId: charlie.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T11:05:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'How about some team-based action? We can use the voice channels.',
      authorId: bob.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T11:10:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'Sounds good! See you all in voice later! 🎮',
      authorId: alice.id,
      channelId: generalChannel.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T11:15:00Z'),
    },
  });

  console.log('💬 Creating DM channels and messages...');
  const adminAliceDM = await prisma.channel.create({
    data: {
      name: 'DM',
      type: 'DM',
    },
  });

  await prisma.dMChannelMember.createMany({
    data: [
      { userId: admin.id, channelId: adminAliceDM.id },
      { userId: alice.id, channelId: adminAliceDM.id },
    ],
  });

  await prisma.message.create({
    data: {
      content: 'Hey Alice, thanks for helping set up the server!',
      authorId: admin.id,
      channelId: adminAliceDM.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T09:00:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'No problem! Happy to help. The community is looking great!',
      authorId: alice.id,
      channelId: adminAliceDM.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T09:05:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'I think we should add more channels for different topics.',
      authorId: admin.id,
      channelId: adminAliceDM.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T09:10:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'Good idea! Maybe we can add channels for art, music, and tech?',
      authorId: alice.id,
      channelId: adminAliceDM.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T09:15:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'Perfect! Let\'s discuss this more later.',
      authorId: admin.id,
      channelId: adminAliceDM.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T09:20:00Z'),
    },
  });

  const groupDM = await prisma.channel.create({
    data: {
      name: 'Group Chat',
      type: 'GROUP_DM',
    },
  });

  await prisma.dMChannelMember.createMany({
    data: [
      { userId: alice.id, channelId: groupDM.id, isOwner: true },
      { userId: bob.id, channelId: groupDM.id },
      { userId: charlie.id, channelId: groupDM.id },
    ],
  });

  await prisma.message.create({
    data: {
      content: 'Hey guys! Created this group for our gaming sessions.',
      authorId: alice.id,
      channelId: groupDM.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T12:00:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'Nice! This will be perfect for coordinating.',
      authorId: bob.id,
      channelId: groupDM.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T12:05:00Z'),
    },
  });

  await prisma.message.create({
    data: {
      content: 'Thanks Alice! When\'s our first session?',
      authorId: charlie.id,
      channelId: groupDM.id,
      type: 'DEFAULT',
      createdAt: new Date('2024-01-01T12:10:00Z'),
    },
  });

  console.log('🎟️ Creating invites...');
  await prisma.invite.create({
    data: {
      code: 'concord',
      serverId: concordCommunity.id,
      channelId: generalChannel.id,
      inviterId: admin.id,
    },
  });

  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  await prisma.invite.create({
    data: {
      code: 'gaming',
      serverId: gamingHub.id,
      channelId: generalChatChannel.id,
      inviterId: alice.id,
      maxUses: 100,
      expiresAt: sevenDaysFromNow,
    },
  });

  console.log('✅ Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
