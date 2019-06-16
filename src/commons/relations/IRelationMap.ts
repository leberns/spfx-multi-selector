import { ISuboption } from '../../interfaces/ISuboption';

export interface IRelationMap {
  initializeRelations(): void;
  getChildren(parentId: number): ISuboption[];
}
