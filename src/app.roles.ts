/* eslint-disable prettier/prettier */
import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN = 'ADMIN',
  AUTHOR = 'AUTHOR',
}

export enum AppResource {
  USER = 'USER',
  TASK = 'TASK',
}
export const roles: RolesBuilder = new RolesBuilder();

roles
  // Author Roles
  .grant(AppRoles.AUTHOR)
  .updateOwn([AppResource.USER])
  .deleteOwn([AppResource.USER])
  .createOwn([AppResource.TASK])
  .updateOwn([AppResource.TASK])
  .deleteOwn([AppResource.TASK])
  // Admin Roles
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.AUTHOR)
  .createAny([AppResource.USER])
  .updateAny([AppResource.USER, AppResource.TASK])
  .deleteAny([AppResource.USER, AppResource.TASK]);
