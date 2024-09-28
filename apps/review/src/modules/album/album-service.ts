import { CallContext, ServerError, Status } from "nice-grpc";
import {
  AlbumServiceImplementation,
  DeepPartial,
  GetAlbumRequest,
  GetAlbumResponse,
  GetAlbumsRequest,
  GetAlbumsResponse,
} from "protos/node/review/services/album_service";

export const albumServiceImpl: AlbumServiceImplementation = {
  getAlbum: function (
    request: GetAlbumRequest,
    context: CallContext,
  ): Promise<DeepPartial<GetAlbumResponse>> {
    throw new ServerError(Status.UNIMPLEMENTED, "Not implemented");
  },
  getAlbums: function (
    request: GetAlbumsRequest,
    context: CallContext,
  ): Promise<DeepPartial<GetAlbumsResponse>> {
    throw new ServerError(Status.UNIMPLEMENTED, "Not implemented");
  },
};
