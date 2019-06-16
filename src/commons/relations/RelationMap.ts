import { IRelationMap } from './IRelationMap';
import { IMainOption } from '../../interfaces/IMainOption';
import { ISuboption } from '../../interfaces/ISuboption';

export class RelationMap implements IRelationMap {
  constructor(private parents: IMainOption[], private children: ISuboption[]) {}

  private parentChildMap: object;

  public initializeRelations(): void {
    this.parentChildMap = {};
    for (const parent of this.parents) {
      const relatedChildren = this.children.filter(op => op.parentId === parent.id);
      this.parentChildMap[parent.id] = relatedChildren;
    }
  }

  public getChildren(parentId: number): ISuboption[] {
    let children = this.parentChildMap[parentId];
    if (children === undefined) {
      children = [];
    }
    return children;
  }
}
