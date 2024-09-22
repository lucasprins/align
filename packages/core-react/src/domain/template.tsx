import { BasicUpdater, Unit, unit } from '@align/core'
import { BasicFunc } from '@align/core/src/func'
import React from 'react'

export type View<Context, State, ForeignMutations, EmbeddedChildren = Unit> = React.FC<
  HeadlessTemplateProps<Context, State, ForeignMutations> & EmbeddedChildren
>

export type HeadlessTemplateProps<context, state, foreignMutations> = {
  context: context
  setState: BasicFunc<BasicUpdater<state>, void>
  foreignMutations: foreignMutations
}

export type TemplateChildren = JSX.Element | JSX.Element[]

export type Wrapper = BasicFunc<{ children?: TemplateChildren }, JSX.Element>

export type TemplateProps<context, state, foreignMutations, view = Unit> = {
  context: context
  setState: BasicFunc<BasicUpdater<state>, void>
  foreignMutations: foreignMutations
  view: view
  children?: TemplateChildren
}

type TemplateRunner<context, state, foreignMutations, view = Unit> = (
  props: TemplateProps<context, state, foreignMutations, view>
) => JSX.Element

export type Template<context, state, foreignMutations, view = Unit> = {
  any: BasicFunc<Array<Template<context, state, foreignMutations>>, Template<context, state, foreignMutations, view>>
  wrap: (Wrapper: Wrapper) => Template<context, state, foreignMutations, view>
  withView: (view: view) => Template<context, state, foreignMutations, Unit>
  mapState: <newState>(
    f: BasicFunc<BasicUpdater<state>, BasicUpdater<newState>>
  ) => Template<context, newState, foreignMutations, view>
  mapStateFromProps: <newState>(
    f: BasicFunc<
      [TemplateProps<context, newState, foreignMutations, view>, BasicUpdater<state>],
      BasicUpdater<newState>
    >
  ) => Template<context, newState, foreignMutations, view>
  mapContext: <newContext>(
    f: BasicFunc<newContext, context | undefined>
  ) => Template<newContext, state, foreignMutations, view>
  mapForeignMutations: <newForeignMutations>(
    f: BasicFunc<newForeignMutations, foreignMutations>
  ) => Template<context, state, newForeignMutations, view>
  mapContextFromProps: <newContext>(
    f: BasicFunc<TemplateProps<newContext, state, foreignMutations, view>, context | undefined>
  ) => Template<newContext, state, foreignMutations, view>
  mapForeignMutationsFromProps: <newForeignMutations>(
    f: BasicFunc<TemplateProps<context, state, newForeignMutations, view>, foreignMutations>
  ) => Template<context, state, newForeignMutations, view>
} & TemplateRunner<context, state, foreignMutations, view>

export const createTemplate = <context, state, foreignMutations, view>(
  actual: TemplateRunner<context, state, foreignMutations, view>
): Template<context, state, foreignMutations, view> => {
  const result = actual as Template<context, state, foreignMutations, view>
  result.wrap = function (this: Template<context, state, foreignMutations, view>, Wrapper: Wrapper) {
    return Template.Operations.Wrap(this, Wrapper)
  }
  result.withView = function (
    this: Template<context, state, foreignMutations, view>,
    view: view
  ): Template<context, state, foreignMutations, Unit> {
    return Template.Operations.WithView(this, view)
  }
  result.mapState = function <newState>(
    this: Template<context, state, foreignMutations, view>,
    f: BasicFunc<BasicUpdater<state>, BasicUpdater<newState>>
  ): Template<context, newState, foreignMutations, view> {
    return Template.Operations.MapState(this, f)
  }
  result.mapStateFromProps = function <newState>(
    this: Template<context, state, foreignMutations, view>,
    f: BasicFunc<
      [TemplateProps<context, newState, foreignMutations, view>, BasicUpdater<state>],
      BasicUpdater<newState>
    >
  ): Template<context, newState, foreignMutations, view> {
    return Template.Operations.MapStateFromProps(this, f)
  }
  result.mapContext = function <newContext>(
    this: Template<context, state, foreignMutations, view>,
    f: BasicFunc<newContext, context | undefined>
  ) {
    return Template.Operations.MapContext(this, f)
  }
  result.mapForeignMutations = function <newForeignMutations>(
    this: Template<context, state, foreignMutations, view>,
    f: BasicFunc<newForeignMutations, foreignMutations>
  ): Template<context, state, newForeignMutations, view> {
    return Template.Operations.MapForeignMutations(this, f)
  }
  result.mapContextFromProps = function <newContext>(
    this: Template<context, state, foreignMutations, view>,
    f: BasicFunc<TemplateProps<newContext, state, foreignMutations, view>, context | undefined>
  ) {
    return Template.Operations.MapContextFromProps(this, f)
  }
  result.mapForeignMutationsFromProps = function <newForeignMutations>(
    this: Template<context, state, foreignMutations, view>,
    f: BasicFunc<TemplateProps<context, state, newForeignMutations, view>, foreignMutations>
  ): Template<context, state, newForeignMutations, view> {
    return Template.Operations.MapForeignMutationsFromProps(this, f)
  }
  result.any = function (
    this: Template<context, state, foreignMutations, view>,
    others: Array<Template<context, state, foreignMutations>>
  ): Template<context, state, foreignMutations, view> {
    return Template.Operations.Any(this, others)
  }
  return result
}

export const Template = {
  Default: <context, state, foreignMutations, view = Unit>(
    actual: TemplateRunner<context & state, state, foreignMutations, view>
  ): Template<context & state, state, foreignMutations, view> => createTemplate(actual),
  Operations: {
    Wrap: <context, state, foreignMutations, view>(
      p: Template<context, state, foreignMutations, view>,
      Wrapper: BasicFunc<{ children?: TemplateChildren }, JSX.Element>
    ): Template<context, state, foreignMutations, view> => createTemplate((props) => <Wrapper>{p(props)}</Wrapper>),
    WithView: <context, state, foreignMutations, view>(
      p: Template<context, state, foreignMutations, view>,
      view: view
    ): Template<context, state, foreignMutations, Unit> =>
      createTemplate((props) => (
        <>
          {p({
            ...props,
            view: view,
          })}
        </>
      )),
    MapState: <context, state, newState, foreignMutations, view>(
      p: Template<context, state, foreignMutations, view>,
      f: BasicFunc<BasicUpdater<state>, BasicUpdater<newState>>
    ): Template<context, newState, foreignMutations, view> =>
      createTemplate((props) => (
        <>
          {p({
            context: props.context,
            setState: (_) => props.setState(f(_)),
            foreignMutations: props.foreignMutations,
            view: props.view,
          })}
        </>
      )),
    MapStateFromProps: <context, state, newState, foreignMutations, view>(
      p: Template<context, state, foreignMutations, view>,
      f: BasicFunc<
        [TemplateProps<context, newState, foreignMutations, view>, BasicUpdater<state>],
        BasicUpdater<newState>
      >
    ): Template<context, newState, foreignMutations, view> =>
      createTemplate((props) => (
        <>
          {p({
            context: props.context,
            setState: (_) => props.setState(f([props, _])),
            foreignMutations: props.foreignMutations,
            view: props.view,
          })}
        </>
      )),
    MapContext: <context, newContext, state, foreignMutations, view>(
      p: Template<context, state, foreignMutations, view>,
      f: BasicFunc<newContext, context | undefined>
    ): Template<newContext, state, foreignMutations, view> =>
      createTemplate((props) => {
        const context = f(props.context)
        if (!context) return <></>
        return (
          <>
            {p({
              context: context,
              setState: props.setState,
              foreignMutations: props.foreignMutations,
              view: props.view,
            })}
          </>
        )
      }),
    MapForeignMutations: <context, state, foreignMutations, newForeignMutations, view>(
      p: Template<context, state, foreignMutations, view>,
      f: BasicFunc<newForeignMutations, foreignMutations>
    ): Template<context, state, newForeignMutations, view> =>
      createTemplate((props) => (
        <>
          {p({
            context: props.context,
            setState: props.setState,
            foreignMutations: f(props.foreignMutations),
            view: props.view,
          })}
        </>
      )),
    MapContextFromProps: <context, newContext, state, foreignMutations, view>(
      p: Template<context, state, foreignMutations, view>,
      f: BasicFunc<TemplateProps<newContext, state, foreignMutations, view>, context | undefined>
    ): Template<newContext, state, foreignMutations, view> =>
      createTemplate((props) => {
        const context = f(props)
        if (!context) return <></>
        return (
          <>
            {p({
              context: context,
              setState: props.setState,
              foreignMutations: props.foreignMutations,
              view: props.view,
            })}
          </>
        )
      }),
    MapForeignMutationsFromProps: <context, state, foreignMutations, newForeignMutations, view>(
      p: Template<context, state, foreignMutations, view>,
      f: BasicFunc<TemplateProps<context, state, newForeignMutations, view>, foreignMutations>
    ): Template<context, state, newForeignMutations, view> =>
      createTemplate((props) => (
        <>
          {p({
            context: props.context,
            setState: props.setState,
            foreignMutations: f(props),
            view: props.view,
          })}
        </>
      )),
    Any: <context, state, foreignMutations, view>(
      p: Template<context, state, foreignMutations, view>,
      others: Array<Template<context, state, foreignMutations>>
    ): Template<context, state, foreignMutations, view> =>
      createTemplate((props) => {
        return (
          <>
            {[
              p(props),
              ...others.map((_) =>
                _({
                  context: props.context,
                  setState: props.setState,
                  foreignMutations: props.foreignMutations,
                  view: unit,
                })
              ),
            ]}
          </>
        )
      }),
  },
}
