# Agents widget

This repo demonstrates a minimal setup for building an Artifact widget. It loads
and saves a custom `agents.json` file checked against a Zod schema. If the file
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

The agents data is defined in `src/types/agents.ts`:

```ts
export const agentsDataSchema = z.object({
  agents: z.array(agentSchema),
  lastUpdated: z.string()
})
```

The widget exposes a simple interface to manage and view agent information.