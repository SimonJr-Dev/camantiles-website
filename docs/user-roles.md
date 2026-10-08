# User Roles

Who uses the system, what each role can do, and how access is limited to one barangay, one section or one school. Written for the full picture (city site plus many barangays) so the first barangay does not need to be reworked later.

Related: [architecture.md](architecture.md#users-and-roles) · [content-model.md](content-model.md) · [multi-site-plan.md](multi-site-plan.md) · [milestones.md](milestones.md) (M11) · [decisions.md](decisions.md)

## When roles start to exist

The first release is a public, read-only site. Nobody logs in; content is files in the repo and the only "role" is the developer. Roles become real in M11, when a content admin is added so staff can post without a developer. Everything below is the target for M11 and after. Until then, the only thing built is the groundwork: every content record already carries the fields that roles need (site, section, status, author).

## How access works: role + scope

A user is given a **role** (what they can do) at a **scope** (where they can do it). One person can hold several assignments.

| Scope | Meaning | Example |
| --- | --- | --- |
| Platform | everything, all sites | the development team |
| City | the city site and oversight of all barangays | City Information Office |
| Barangay | one barangay site | Barangay Camantiles |
| Section | one section of one barangay | SK of Camantiles |
| School | one school of one barangay | Camantiles High School |

Examples: *Barangay Admin @ camantiles*. *Section Editor @ camantiles / sk*. *School Editor @ camantiles / high-school*. A teacher who is also the SK secretary holds two assignments.

Rule: an assignment never reaches outside its scope. A Camantiles editor cannot see another barangay's drafts, and an SK editor cannot edit Barangay Hall content.

## Roles

### Public

| Role | Who | Can do |
| --- | --- | --- |
| **Visitor** | anyone, no login | read all published pages in either language, download forms, tap hotlines |

### Barangay level

| Role | Typical holder | Can do |
| --- | --- | --- |
| **Barangay Admin** | Barangay Secretary, or whoever the Punong Barangay designates | everything inside their barangay: edit and publish any section, manage site details (address, hours, hotlines, officials), invite and remove the barangay's users and set their scope, view the activity log |
| **Barangay Editor** | barangay staff | create and edit Barangay Hall content (announcements, events, services, forms, council). Submits for approval unless given publish rights |
| **Section Editor** | one per section: SK Secretary (SK), Barangay Health Worker or Midwife (Health), Federation Secretary (Senior Citizens) | create and edit content in their own section only: announcements, programs, schedules, team. Submits for approval unless given publish rights |
| **School Editor** | teacher or staff assigned by the school head | edit their own school only: announcements, faculty, class sections and advisers, gallery, enrollment, alumni |
| **Approver** | Punong Barangay, SK Chairperson, school head; or the Barangay Admin | review submitted items in their scope, publish or send back with a note. Does not need to write content |

Section and school editors are the same role with different scope. They are listed separately because they are different people in practice.

### City level

| Role | Typical holder | Can do |
| --- | --- | --- |
| **City Admin** | City Information Office or IT | create a barangay site and its first Barangay Admin, suspend a site or user, post city-wide advisories that appear on every barangay site, unpublish any barangay item in an emergency, view all activity logs |
| **City Editor** | city staff | create and edit city pages and city-wide advisories. No access to barangay drafts |

City roles do not write barangay content day to day. Each barangay owns its own pages.

### Platform level

| Role | Who | Can do |
| --- | --- | --- |
| **Super Admin** | the development team (CRWD Philippines) | everything: all sites, all users, system settings, design and code. Used for setup and support, not for routine posting |

### Future, only if online services are built

| Role | Who | Can do |
| --- | --- | --- |
| **Resident** | a verified resident with an account | submit document requests or registrations, track their status, see their own submissions only |
| **Records Officer** | barangay staff handling requests | view and process residents' submissions for their barangay |

These two involve personal data and are out of scope: no online forms at launch (decisions #5). They are named here so the role system leaves room for them.

## Permissions

✓ allowed · own = only items in their scope · — not allowed

| Action | Visitor | Section / School Editor | Barangay Editor | Approver | Barangay Admin | City Editor | City Admin | Super Admin |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Read published pages | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| See drafts | — | own | hall | own scope | barangay | city | all | all |
| Create and edit content | — | own | hall | — | barangay | city | city | all |
| Submit for approval | — | own | hall | — | ✓ | city | ✓ | ✓ |
| Publish and unpublish | — | if granted | if granted | own scope | barangay | — | city, plus emergency unpublish anywhere | all |
| Delete content | — | own drafts | own drafts | — | barangay | own drafts | city | all |
| Upload photos and files | — | own | hall | — | barangay | city | city | all |
| Edit translations | — | own | hall | — | barangay | city | city | all |
| Edit site details (contact, hotlines, officials) | — | — | — | — | ✓ | — | city details | all |
| Post barangay advisory | — | — | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| Post city-wide advisory | — | — | — | — | — | ✓ | ✓ | ✓ |
| Manage users in own barangay | — | — | — | — | ✓ | — | ✓ | ✓ |
| Create or suspend a barangay site | — | — | — | — | — | — | ✓ | ✓ |
| View activity log | — | — | — | own scope | barangay | — | all | all |
| Change theme, modules, schools list | — | — | — | — | request only | — | request only | ✓ |

"If granted": a small barangay may not want a two-step process. The Barangay Admin can give any editor publish rights for their scope, which makes that person their own approver.

## Publishing flow

```
Draft  →  In review  →  Published  →  Archived
            ↓ sent back with a note
          Draft
```

- Editors save drafts and submit them. Approvers or the Barangay Admin publish.
- An item must have both English and Filipino text before it can be published, or be explicitly marked English-only.
- Advisories (weather, class suspension, emergencies) skip review: anyone allowed to post one publishes immediately, because speed matters more than sign-off.
- Published items keep their history. Unpublishing hides an item without deleting it.
- Events and announcements can carry an expiry date and drop off the public pages on their own.

## Accounts and security

- **Invite only.** No public sign-up for staff roles. A Barangay Admin invites by email; a City Admin creates the first Barangay Admin of each site.
- **Accounts belong to people, not offices.** No shared "sk@" logins, so the activity log means something.
- **Terms end.** Barangay and SK officials change at elections. Assignments have an optional end date, and the Barangay Admin reviews the user list after each election. Removing a user never removes their content.
- **Two-step sign-in** required for Barangay Admin, City Admin and Super Admin.
- **Activity log** of who created, edited, published, unpublished or deleted what, and who changed whose access.
- **Checked on the server.** Hiding a button is not access control. Every save and publish checks the user's role and scope on the server.
- **Least access.** New users start as editors of one section. Wider access is granted on purpose.

## Mapping to Camantiles

Starting assignments (decisions #9 to #11). Names and emails to be supplied by the barangay:

| Person | Assignment |
| --- | --- |
| Barangay Secretary | Barangay Admin @ camantiles |
| Punong Barangay | Approver @ camantiles |
| Barangay staff | Barangay Editor @ camantiles |
| SK Secretary | Section Editor @ camantiles / sk |
| SK Chairperson | Approver @ camantiles / sk |
| Health Center midwife or BHW | Section Editor @ camantiles / health |
| Senior Citizens Federation Secretary | Section Editor @ camantiles / seniors |
| One staff member per school (4) | School Editor @ camantiles / day-care-center, elementary-school, trinidad-perez-elementary-school, high-school |
| CRWD Philippines | Super Admin |

## What each section's editor manages

| Scope | Content |
| --- | --- |
| Barangay Hall | announcements, events, featured item, services and fees, downloadable forms, Sangguniang Barangay council, barangay advisories |
| Health | clinic hours, services, weekly schedule, what to bring, advisories and programs, health workers |
| SK | programs, updates, transparency board, SK council |
| Senior Citizens | federation president, pension and benefits schedule, health and wellness, activities, registration requirements |
| School (each) | facts, about, announcements, faculty, class sections and advisers, alumni homecoming, gallery, enrollment and requirements, contact |
| Barangay Admin only | About page, address and hours, hotlines, social links, home page officials |
