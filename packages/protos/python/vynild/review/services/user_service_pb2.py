# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: vynild/review/services/user_service.proto
# Protobuf Python Version: 5.28.2
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    5,
    28,
    2,
    '',
    'vynild/review/services/user_service.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from vynild.review.models import user_pb2 as vynild_dot_review_dot_models_dot_user__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n)vynild/review/services/user_service.proto\x12\x16vynild.review.services\x1a\x1fvynild/review/models/user.proto\"a\n\x11\x43reateUserRequest\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\x12\x14\n\x05\x65mail\x18\x02 \x01(\tR\x05\x65mail\x12\x1a\n\x08password\x18\x03 \x01(\tR\x08password\"7\n\x12\x43reateUserResponse\x12!\n\x0c\x61\x63\x63\x65ss_token\x18\x01 \x01(\tR\x0b\x61\x63\x63\x65ssToken\",\n\x0eGetUserRequest\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\"E\n\x0fGetUserResponse\x12\x32\n\x04user\x18\x01 \x01(\x0b\x32\x1e.vynild.review.models.UserDataR\x04user\"J\n\x10LoginUserRequest\x12\x1a\n\x08username\x18\x01 \x01(\tR\x08username\x12\x1a\n\x08password\x18\x02 \x01(\tR\x08password\"6\n\x11LoginUserResponse\x12!\n\x0c\x61\x63\x63\x65ss_token\x18\x01 \x01(\tR\x0b\x61\x63\x63\x65ssToken2\xb0\x02\n\x0bUserService\x12\x63\n\nCreateUser\x12).vynild.review.services.CreateUserRequest\x1a*.vynild.review.services.CreateUserResponse\x12`\n\tLoginUser\x12(.vynild.review.services.LoginUserRequest\x1a).vynild.review.services.LoginUserResponse\x12Z\n\x07GetUser\x12&.vynild.review.services.GetUserRequest\x1a\'.vynild.review.services.GetUserResponseB\xa8\x01\n\x1a\x63om.vynild.review.servicesB\x10UserServiceProtoP\x01\xa2\x02\x03VRS\xaa\x02\x16Vynild.Review.Services\xca\x02\x16Vynild\\Review\\Services\xe2\x02\"Vynild\\Review\\Services\\GPBMetadata\xea\x02\x18Vynild::Review::Servicesb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'vynild.review.services.user_service_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'\n\032com.vynild.review.servicesB\020UserServiceProtoP\001\242\002\003VRS\252\002\026Vynild.Review.Services\312\002\026Vynild\\Review\\Services\342\002\"Vynild\\Review\\Services\\GPBMetadata\352\002\030Vynild::Review::Services'
  _globals['_CREATEUSERREQUEST']._serialized_start=102
  _globals['_CREATEUSERREQUEST']._serialized_end=199
  _globals['_CREATEUSERRESPONSE']._serialized_start=201
  _globals['_CREATEUSERRESPONSE']._serialized_end=256
  _globals['_GETUSERREQUEST']._serialized_start=258
  _globals['_GETUSERREQUEST']._serialized_end=302
  _globals['_GETUSERRESPONSE']._serialized_start=304
  _globals['_GETUSERRESPONSE']._serialized_end=373
  _globals['_LOGINUSERREQUEST']._serialized_start=375
  _globals['_LOGINUSERREQUEST']._serialized_end=449
  _globals['_LOGINUSERRESPONSE']._serialized_start=451
  _globals['_LOGINUSERRESPONSE']._serialized_end=505
  _globals['_USERSERVICE']._serialized_start=508
  _globals['_USERSERVICE']._serialized_end=812
# @@protoc_insertion_point(module_scope)
