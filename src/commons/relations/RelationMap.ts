import { IRelationMap } from './IRelationMap';
import { IRelationalOption } from '../../interfaces/IRelationalOption';

export class RelationMap implements IRelationMap {
  constructor(private parents: IRelationalOption[], private children: IRelationalOption[]) {}

  private parentChildMap: object;

  public initializeRelations(): void {
    this.parentChildMap = {};
    for (const parent of this.parents) {
      const relatedChildren = this.children.filter(op => op.parentKey === parent.key);
      this.parentChildMap[parent.key] = relatedChildren;
    }
  }

  public getChildren(parentKey: string): IRelationalOption[] {
    if (!this.parentChildMap) {
      return [];
    }

    const children = this.parentChildMap[parentKey];
    if (!!children) {
      return children;
    }

    return children;
  }
}
