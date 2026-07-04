# Accord Architecture

## Direction
Accord will use Supabase for the MVP, but the product must be portable to AWS or a custom backend later.

## Design Rule
The React UI should not directly depend on Supabase business logic. The UI calls Accord services/API routes. Services use provider interfaces. Supabase is one provider implementation.

```text
Frontend
  ↓
Accord API / Service Layer
  ↓
Provider Interfaces
  ↓
Supabase MVP implementation
  ↓ later
AWS/custom implementation
```

## Portable Components

### Database
- Use standard Postgres tables.
- Avoid Supabase-specific business logic where possible.
- Row-level security can be used for MVP, but permissions should also be represented in application-level roles.

### Auth
- MVP: Supabase Auth.
- Future: Auth0, AWS Cognito, or custom auth.
- App should rely on normalized `AuthUser` and role claims.

### Storage
- MVP: Supabase Storage.
- Future: AWS S3.
- App should use `StorageProvider`, not direct SDK calls from UI.

### AI
- Providers must be modular: OpenAI, Anthropic, transcription provider, future self-hosted model.
- AI outputs always become suggestions pending human approval.

### PDF/Form Engine
- Treat forms as versioned templates mapped to central transaction schema.
- Do not make business logic depend on a particular PDF library.

### Compliance
Minimum baked-in controls:
- Recording consent gate.
- Role-based access.
- Audit trail.
- Retention policy.
- Sensitive-document classification.
- Human approval before contract package generation.
