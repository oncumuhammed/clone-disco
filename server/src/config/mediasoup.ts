/**
 * MediaSoup configuration for WebRTC media server.
 * Configures workers, routers, and transports for voice and video communication.
 */
import type * as mediasoup from 'mediasoup';
import { types as mediasoupTypes } from 'mediasoup';
import { env } from './env.js';

export const mediasoupConfig = {
  worker: {
    rtcMinPort: env.MEDIASOUP_MIN_PORT,
    rtcMaxPort: env.MEDIASOUP_MAX_PORT,
    logLevel: 'warn' as mediasoupTypes.WorkerLogLevel,
    logTags: [
      'info',
      'ice',
      'dtls',
      'rtp',
      'srtp',
      'rtcp',
    ] as mediasoupTypes.WorkerLogTag[],
  },
  router: {
    mediaCodecs: [
      {
        kind: 'audio' as mediasoupTypes.MediaKind,
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2,
      },
      {
        kind: 'video' as mediasoupTypes.MediaKind,
        mimeType: 'video/VP8',
        clockRate: 90000,
        parameters: {
          'x-google-start-bitrate': 1000,
        },
      },
    ] as mediasoupTypes.RtpCodecCapability[],
  },
  webRtcTransport: {
    listenIps: [
      {
        ip: env.MEDIASOUP_LISTEN_IP,
        announcedIp: env.MEDIASOUP_ANNOUNCED_IP,
      },
    ],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
    initialAvailableOutgoingBitrate: 1000000,
    maxIncomingBitrate: 1500000,
  },
};

export async function createMediasoupWorker(
  mediasoupModule: typeof mediasoup,
): Promise<mediasoupTypes.Worker> {
  const worker = await mediasoupModule.createWorker(mediasoupConfig.worker);

  worker.on('died', () => {
    console.error('MediaSoup worker died, exiting in 2 seconds...');
    setTimeout(() => process.exit(1), 2000);
  });

  return worker;
}

export async function createMediasoupRouter(
  worker: mediasoupTypes.Worker,
): Promise<mediasoupTypes.Router> {
  return await worker.createRouter({ mediaCodecs: mediasoupConfig.router.mediaCodecs });
}
