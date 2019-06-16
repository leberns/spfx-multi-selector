import { ISuboption } from '../../interfaces/ISuboption';

export interface IRelationMap {
  initializeRelations(): void;
  getChildren(parentKey: string): ISuboption[];
}
