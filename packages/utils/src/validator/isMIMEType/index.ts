import { isString } from '../isString';

const MIME_TYPES = [
  'application/json',
  'application/javascript',
  'application/pdf',
  'application/xml',
  'application/zip',
  'application/x-www-form-urlencoded',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'audio/mpeg',
  'audio/ogg',
  'audio/wav',
  'audio/webm',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'text/css',
  'text/html',
  'text/plain',
  'text/xml',
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm',
] as const;

export type MIMEType = (typeof MIME_TYPES)[number];

export function isMIMEType(arg: unknown): arg is MIMEType {
  return isString(arg) ? MIME_TYPES.some((value) => value === arg) : false;
}
