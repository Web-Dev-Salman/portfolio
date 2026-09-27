# Git Guide — Portfolio

Repository: **https://github.com/Web-Dev-Salman/portfolio.git**
Main branch: **main**

---

## 1. One-time setup (run once per computer)

```bash
# Your identity (shown on every commit)
git config --global user.name  "Salman"
git config --global user.email "salmansharif1641@gmail.com"

# Name new repositories' first branch "main"
git config --global init.defaultBranch main

# `git pull` merges instead of asking every time
git config --global pull.rebase false

# `git push` goes to the branch with the same name
git config --global push.default current
git config --global push.autoSetupRemote true

# Line endings: Windows → use "true", macOS / Linux → use "input"
git config --global core.autocrlf true

# VS Code as the editor for commit messages
git config --global core.editor "code --wait"

# Coloured output
git config --global color.ui auto
```

Check your settings any time:

```bash
git config --global --list
```

### Same settings as a file

Instead of the commands above you can paste this into your global config file:
- Windows: `C:\Users\<you>\.gitconfig`
- macOS / Linux: `~/.gitconfig`

```ini
[user]
	name = Salman
	email = salmansharif1641@gmail.com
[init]
	defaultBranch = main
[pull]
	rebase = false
[push]
	default = current
	autoSetupRemote = true
[core]
	autocrlf = true        # use "input" on macOS / Linux
	editor = code --wait
[color]
	ui = auto
[alias]
	st = status -sb
	lg = log --oneline --graph --decorate -15
	save = !git add -A && git commit -m
	undo = reset --soft HEAD~1
```

The aliases give you shortcuts:

| Shortcut | Does |
|---|---|
| `git st` | short status |
| `git lg` | pretty history |
| `git save "message"` | add all + commit in one step |
| `git undo` | undo the last commit (keeps your changes) |

---

## 2. Get the project (first time only)

```bash
git clone https://github.com/Web-Dev-Salman/portfolio.git
cd portfolio
```

If you cloned before the repo was renamed, update the address:

```bash
git remote set-url origin https://github.com/Web-Dev-Salman/portfolio.git
git remote -v        # check
```

---

## 3. Daily workflow

```bash
git pull                              # 1. get latest from GitHub
# ...edit files in VS Code...         # 2. make changes
git status                            # 3. see what changed
git add .                             # 4. stage everything
git commit -m "Describe the change"   # 5. save a snapshot
git push                              # 6. upload to GitHub
```

**pull → edit → add → commit → push**

---

## 4. Working on a separate branch (optional)

```bash
git checkout -b new-feature        # create + switch to a new branch
# ...edit, add, commit...
git push                           # upload the branch
git checkout main                  # go back to main
git merge new-feature              # bring the branch's work into main
git push                           # upload main
git branch -d new-feature          # delete the branch locally
```

---

## 5. Fixing common problems

| Problem | Fix |
|---|---|
| `rejected … fetch first` when pushing | `git pull` then `git push` |
| Merge conflict | Open the file, keep the right lines, delete `<<<<<<<` `=======` `>>>>>>>`, then `git add .` → `git commit` → `git push` |
| Undo changes to a file (not committed) | `git restore <file>` |
| Unstage a file | `git restore --staged <file>` |
| Wrong last commit message (not pushed) | `git commit --amend -m "New message"` |
| Undo last commit, keep changes | `git reset --soft HEAD~1` |
| Which branch am I on? | `git branch` |
| Password not accepted on push | Use a Personal Access Token: GitHub → Settings → Developer settings → Tokens |

---

## 6. Project files in this repo

| File | Purpose |
|---|---|
| `.gitignore` | Files Git should never upload (`.DS_Store`, `node_modules/`, editor folders…) |
| `.gitattributes` | Keeps line endings consistent across Windows / macOS / Linux |
| `GIT-GUIDE.md` | This guide |
