import { IRelationalOption } from '../../interfaces/IRelationalOption';

export interface IRelationMap {
  initializeRelations(): void;
  getChildren(parentKey: string): IRelationalOption[];
}
