// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: vynild/forum/models/room.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "vynild.forum.models";

export interface Room {
  roomType?: { $case: "albumId"; value: string } | { $case: "genre"; value: string } | undefined;
}

function createBaseRoom(): Room {
  return { roomType: undefined };
}

export const Room: MessageFns<Room> = {
  encode(message: Room, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    switch (message.roomType?.$case) {
      case "albumId":
        writer.uint32(10).string(message.roomType.value);
        break;
      case "genre":
        writer.uint32(18).string(message.roomType.value);
        break;
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Room {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.roomType = { $case: "albumId", value: reader.string() };
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.roomType = { $case: "genre", value: reader.string() };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Room {
    return {
      roomType: isSet(object.albumId)
        ? { $case: "albumId", value: globalThis.String(object.albumId) }
        : isSet(object.genre)
        ? { $case: "genre", value: globalThis.String(object.genre) }
        : undefined,
    };
  },

  toJSON(message: Room): unknown {
    const obj: any = {};
    if (message.roomType?.$case === "albumId") {
      obj.albumId = message.roomType.value;
    }
    if (message.roomType?.$case === "genre") {
      obj.genre = message.roomType.value;
    }
    return obj;
  },

  create(base?: DeepPartial<Room>): Room {
    return Room.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Room>): Room {
    const message = createBaseRoom();
    if (
      object.roomType?.$case === "albumId" && object.roomType?.value !== undefined && object.roomType?.value !== null
    ) {
      message.roomType = { $case: "albumId", value: object.roomType.value };
    }
    if (object.roomType?.$case === "genre" && object.roomType?.value !== undefined && object.roomType?.value !== null) {
      message.roomType = { $case: "genre", value: object.roomType.value };
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string; value: unknown } ? { $case: T["$case"]; value?: DeepPartial<T["value"]> }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create(base?: DeepPartial<T>): T;
  fromPartial(object: DeepPartial<T>): T;
}
