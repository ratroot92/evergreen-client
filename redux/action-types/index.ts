import { ErrorTypes } from './error-action-types';
import { LoaderTypes } from './loader-action-types';
import { RoleTypes } from './roles-action-types';
import { UserTypes } from './user-action-types';

export type AppActions = UserTypes | LoaderTypes | ErrorTypes | RoleTypes;
