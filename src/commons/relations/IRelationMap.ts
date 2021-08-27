import { IRelationalOption } from '../../interfaces/IRelationalOption';

export interface IRelationMap {
  initialize(): void;
  getChildren(parentKey: string): IRelationalOption[];
}
