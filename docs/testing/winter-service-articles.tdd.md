# Winter HVAC Content Cluster - TDD Evidence

## Source

User journeys were derived from the approved ten-topic HVAC content cluster: three immediate heating and heat-pump symptom articles plus seven supporting repair, maintenance, safety, comfort, and rebate guides.

## User journeys

- A homeowner with a heat pump that is not heating can find safe checks and request service.
- A homeowner whose furnace runs while the home stays cold can understand safe next steps and request heating service.
- A homeowner unsure whether defrost mode is normal can distinguish normal behavior from service warning signs.
- A homeowner can find a direct, safe next step for short cycling, cold rooms, thermostat problems, filter replacement, loud HVAC noises, heating safety, or rebate planning.

## RED evidence

Command: `node tests/article-library.test.js`

Result before implementation: `AssertionError [ERR_ASSERTION]: Missing article record: heat-pump-not-heating`.

## GREEN evidence

Command: `node tests/article-library.test.js`

Result after implementation: `Validated 10 planned article records and routes.`

## Additional validation

| Guarantee | Validation | Result |
| --- | --- | --- |
| Article data parses | `node --check articles-data.js` | Pass |
| Sitemap is well-formed XML | PowerShell XML parse | Pass |
| Each clean route, canonical URL, title, and CTA renders | Local browser review at desktop and mobile sizes | Pass |
| No whitespace errors in the pending diff | `git diff --check` | Pass |

## Known gap

The static website has no package-based test runner or coverage configuration. This focused Node validation covers the three content records and route files; visual review covers their rendered output.
