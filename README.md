# Contacts widget

This repo demonstrates a minimal setup for building an Artifact widget. Contact
information is stored as individual JSON files inside a `contacts` directory. Ea
ch file is named using a ULID (`[ulid].json`) and validated against a Zod schema
when written.

## Development

```bash
npm run dev
```

## Building

```bash
npm run build
```

Load `dist/index.html` in an `ArtifactFrameHolder` to embed the widget inside
another application.

### Data shape

The contacts data is defined in `src/types/contacts.ts`:

```ts
export const contactsDataSchema = z.object({
  contacts: z.array(contactSchema),
  lastUpdated: z.string()
})
```

The widget exposes a simple interface to manage and view contact information.
