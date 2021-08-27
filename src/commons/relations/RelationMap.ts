import { IRelationMap } from './IRelationMap';
import { IRelationalOption } from '../../interfaces/IRelationalOption';
import { IOptionsComparer } from '../comparers/IOptionsComparer';
import { OptionsComparer } from '../comparers/OptionsComparer';

export class RelationMap implements IRelationMap {
  constructor(private parents: IRelationalOption[], private children: IRelationalOption[]) {}

  private parentChildrenMap: object;

  public initialize(): void {
    this.parentChildrenMap = {};
    for (const parent of this.parents) {
      const relatedChildren = this.children.filter(op => op.parentKey === parent.key);

      const comparer: IOptionsComparer = new OptionsComparer();
      const sortedChildren = relatedChildren.sort((a, b) => comparer.compare(a, b));

      this.parentChildrenMap[parent.key] = sortedChildren;
    }
  }

  public getChildren(parentKey: string): IRelationalOption[] {
    if (!this.parentChildrenMap) {
      return [];
    }

    const children = this.parentChildrenMap[parentKey];
    if (!!children) {
      return children;
    }

    return [];
  }
}
