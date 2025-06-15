# Contacts widget

This repo demonstrates a minimal setup for building an Artifact widget. Contact
information is stored as individual JSON files inside a `contacts` directory.
Each file is named using a ULID (`[ulid].json`) and validated against a Zod
schema when written. For example:

```
contacts/01JXS0NVP4MTGAMWNXS06X9XTG.json
contacts/01JXS0NVP87P8DDAXCJYGVW16P.json
```

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

Each contact file conforms to `contactSchema` from `src/types/contacts.ts`.
When the widget loads, these files are combined into an object shaped like:

```ts
export const contactsDataSchema = z.object({
  contacts: z.array(contactSchema),
  lastUpdated: z.string()
})
```

The widget exposes a simple interface to manage and view contact information.
