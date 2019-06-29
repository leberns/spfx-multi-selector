import { IOptionItem } from '../../interfaces/IOptionItem';

export interface IRelationMap {
  initializeRelations(): void;
  getChildren(parentKey: string): IOptionItem[];
}
