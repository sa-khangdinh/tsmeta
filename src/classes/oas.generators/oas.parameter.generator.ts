import { ParameterParam } from '../../lib/annotation.schema'
import { Parameter } from '../../lib/openapispec'
import { OasConfig } from '../../lib/tsmeta.config'
import { TsDecorator, TsParameter } from '../../lib/tsmeta.schema'

/**
 * class OasParameterGenerator
 */
class OasParameterGenerator {

  private parameterAnnotations: string[] = ['PathVariable', 'RequestParam', 'RequestHeader', 'CookieValue']
  private parameterAnnotationMap: { [key: string]: string } = {
    PathVariable: 'path',
    RequestParam: 'query',
    RequestHeader: 'header',
    CookieValue: 'cookie'
  }

  constructor(private oasConfig: OasConfig) {}

  /**
   * generate Parameter
   */
  public generate(tsParameter: TsParameter): Parameter {
    let parameterDecorator: TsDecorator

    if (tsParameter.decorators) {
      parameterDecorator = tsParameter.decorators.find((tsDecorator: TsDecorator) => this.parameterAnnotations.includes(this.mapAnnotations(tsDecorator.name)))
    }

    if (!parameterDecorator) return undefined

    const parameterArgument: ParameterParam = parameterDecorator.tsarguments.pop().representation

    const $ref: string = parameterArgument.ref
    const allowEmptyValue: boolean = !parameterArgument.required
    const deprecated: boolean = false
    const description: string = `${parameterDecorator.name} ${tsParameter.name}`
    const example: any = parameterArgument.example
    const _in: string = this.parameterAnnotationMap[parameterDecorator.name]
    const name: string = parameterArgument.name
    const required: boolean = parameterArgument.required
    const schema: any = parameterArgument.res || { type: 'string' }

    return {
      $ref,
      allowEmptyValue,
      deprecated,
      description,
      example,
      in: _in,
      name,
      required,
      schema
    }
  }

  /**
   * fetch standard mapping annotation by used annotation
   */
  private mapAnnotations(used: string): string {
    return this.oasConfig.annotationsMap[used] || used
  }
}

export { OasParameterGenerator }