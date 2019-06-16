import { IRelationMap } from './IRelationMap';
import { IMainOption } from '../../interfaces/IMainOption';
import { ISuboption } from '../../interfaces/ISuboption';

export class RelationMap implements IRelationMap {
  constructor(private parents: IMainOption[], private children: ISuboption[]) {}

  private parentChildMap: object;

  public initializeRelations(): void {
    this.parentChildMap = {};
    for (const parent of this.parents) {
      const relatedChildren = this.children.filter(op => op.parentKey === parent.key);
      this.parentChildMap[parent.key] = relatedChildren;
    }
  }

  public getChildren(parentKey: string): ISuboption[] {
    let children = this.parentChildMap[parentKey];
    if (children === undefined) {
      children = [];
    }
    return children;
  }
}
