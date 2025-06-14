# Contacts widget

This repo demonstrates a minimal setup for building an Artifact widget. It loads
and saves a custom `contacts.json` file checked against a Zod schema. If the file
is missing a default one is written automatically.

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
