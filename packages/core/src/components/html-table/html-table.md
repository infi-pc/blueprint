@# HTML table

This component provides Blueprint styling to native HTML tables.

<div class="@ns-callout @ns-intent-primary @ns-icon-info-sign">
    <h4 class="@ns-heading">This is not @blueprint-modernized/table</h4>

This table component is a simple CSS-only skin for HTML `<table>` elements.
It is ideal for basic static tables. If you're looking for more complex
spreadsheet-like features, check out [**@blueprint-modernized/table**](#table).

</div>

@## Props

The `<HTMLTable>` component provides modifier props to apply styles to an HTML
`<table>` element. Note that you are responsible for rendering `<thead>` and
`<tbody>` elements as children.

@interface IHTMLTableProps

@## CSS

Apply the `@ns-html-table` class to a `<table>` element. You can apply modifiers as additional classes.

@css html-table
