import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const isPublicKey = "isPublic";
export const skipAuth = (): CustomDecorator<string> => SetMetadata(isPublicKey, true);
