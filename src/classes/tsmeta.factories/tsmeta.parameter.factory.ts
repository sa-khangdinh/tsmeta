import { Decorator, Identifier, ParameterDeclaration } from 'typescript'
import { IdentifierToString } from '../../lib/ts.methods'
import { TsDecorator, TsParameter, TsType } from '../../resources/tsmeta.schema'
import { TsMetaDecoratorFactory } from './tsmeta.decorator.factory'

/**
 * class TsMetaParameterFactory
 */
class TsMetaParameterFactory {

  private tsMetaDecoratorFactory: TsMetaDecoratorFactory = new TsMetaDecoratorFactory()

  /**
   * build TsParameter element
   */
  public build(parameterDeclaration: ParameterDeclaration): TsParameter {
    const name: string = IdentifierToString(<Identifier> parameterDeclaration.name)
    const decorators: TsDecorator[] = parameterDeclaration.decorators
      ? parameterDeclaration.decorators.map((decorator: Decorator) => this.tsMetaDecoratorFactory.build(decorator))
      : undefined
    const tstype: TsType = undefined

    return {
      decorators,
      name,
      tstype
    }
  }
}

export { TsMetaParameterFactory }
