# -*- coding: utf-8 -*-
"""
Fluent Media Portfolio & Landing Page - GitHub Uploader
Push repository to GitHub using Dulwich (Pure-Python Git)
"""
import sys
import os
import dulwich.porcelain as git

def push_repo():
    repo_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 1. Ensure all latest changes are added and committed
    git.add(repo_dir)
    status = git.status(repo_dir)
    has_changes = bool(status.staged['add'] or status.staged['modify'] or status.staged['delete'])
    if has_changes:
        git.commit(
            repo_dir,
            message=b"Update Fluent Media Landing Page & Portfolio",
            committer=b"Zubair Jamil <info.zubairansari@gmail.com>",
            author=b"Zubair Jamil <info.zubairansari@gmail.com>"
        )
        print("[INFO] Latest changes committed.")
    
    # 2. Get remote URL
    if len(sys.argv) > 1:
        remote_url = sys.argv[1].strip()
    else:
        print("="*60)
        print(" FLUENT MEDIA &bull; GITHUB UPLOADER")
        print("="*60)
        print("Format examples:")
        print("1. https://github.com/USERNAME/REPO_NAME.git")
        print("2. https://<GITHUB_PAT_TOKEN>@github.com/USERNAME/REPO_NAME.git")
        print("="*60)
        remote_url = input("Enter your GitHub repository URL: ").strip()

    if not remote_url:
        print("[ERROR] No repository URL provided.")
        return False

    print(f"\n[INFO] Pushing repository to: {remote_url} ...")
    
    # Try pushing to main branch, then master
    success = False
    for branch in [b'refs/heads/master:refs/heads/main', b'refs/heads/master:refs/heads/master']:
        try:
            git.push(repo_dir, remote_url, refspecs=[branch])
            print(f"\n[SUCCESS] Successfully uploaded to GitHub ({branch.decode().split(':')[-1]})!")
            success = True
            break
        except Exception as e:
            err_msg = str(e)
            if "Authentication failed" in err_msg or "401" in err_msg or "403" in err_msg:
                print(f"\n[AUTH ERROR] Authentication required.")
                print("Tip: Use Personal Access Token (PAT):")
                print("https://<YOUR_TOKEN>@github.com/<USERNAME>/<REPO>.git")
                return False
            continue

    if not success:
        print("\n[ERROR] Push failed. Make sure the repository exists and your token/permissions are valid.")
        return False
    return True

if __name__ == '__main__':
    push_repo()
