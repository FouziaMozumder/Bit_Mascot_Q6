## Automation Project

### Automation testing on a website using POM Structure And Playright

You are asking for automation tests on the (https://www.saucedemo.com/) site.

Log in with standard_user.Finish the purchase journey and verify the successful order message. Then, reset the App State again and log out.

### Clone repository
```bash
git clone https://github.com/FouziaMozumder/Automation-Project.git
```
## Instructions

### Generate allure report
```bash
allure generate allure-results --clean -o allure-report 
```
### Open allure report
```bash
allure open allure-report 
```
### Run the code
```bash
npm run test 
```




