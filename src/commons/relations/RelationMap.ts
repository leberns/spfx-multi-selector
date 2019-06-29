import { IRelationMap } from './IRelationMap';
import { IOptionItem } from '../../interfaces/IOptionItem';

export class RelationMap implements IRelationMap {
  constructor(private parents: IOptionItem[], private children: IOptionItem[]) {}

  private parentChildMap: object;

  public initializeRelations(): void {
    this.parentChildMap = {};
    for (const parent of this.parents) {
      const relatedChildren = this.children.filter(op => op.parentKey === parent.key);
      this.parentChildMap[parent.key] = relatedChildren;
    }
  }

  public getChildren(parentKey: string): IOptionItem[] {
    let children = this.parentChildMap[parentKey];
    if (children === undefined) {
      children = [];
    }
    return children;
  }
}
