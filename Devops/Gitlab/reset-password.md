# Reset Gitlab Password

username: root

<https://docs.gitlab.com/ee/security/reset_user_password.html>

`GITLAB_ROOT_PASSWORD` string Sets the password for the root user on installation.

> If you are using Docker, you can get this bash

```bash
docker exec -it gitlab_continer bash
```

> and open Rails console

```bash
gitlab-rails console -e production
```

> and Enter the code below

```bash
gitlab-rails console -e production

user = User.where(id: 1).first
user.password = 'Aa123456'
user.password_confirmation = 'Aa123456'
user.save
exit

```
