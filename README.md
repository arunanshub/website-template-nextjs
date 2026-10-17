# website-template-nextjs

A [Copier](https://copier.readthedocs.io) template for Next.js sites: bun, strict oxlint,
prettier, lefthook, shadcn/ui and TanStack Query. This repository is itself a working
app, so `bun dev`, `bun lint` and `bun typecheck` work here as usual.

## New project

```bash
copier copy path/or/url/to/website-template-nextjs my-site
cd my-site && git init && mise trust && mise install && bun install && lefthook install
```

Copier copies the latest git tag, or `HEAD` when there is none. Pass `--vcs-ref HEAD`
to include uncommitted changes from a local checkout.

## Update a project

Run `copier update` inside the project. It reads `.copier-answers.yml` and merges the
template changes since the recorded commit.

## Working on the template

- A file `x.jinja` is rendered to `x`; a plain `x` next to it stays in this repository
  only. `lib/site.ts` and this README work that way.
- Questions live in `copier.yml`. To add an optional feature, add a `bool` question and
  exclude its files when it is off; the comment in `_exclude` shows the pattern.
- Test a change: `copier copy --defaults --vcs-ref HEAD -d project_name=Test . /tmp/test-site`.
