from pages.login_page import LoginPage

# TC_041
def test_direct_url_access(driver):
    driver.get("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList")
    assert "login" in driver.current_url

# TC_042
def test_sql_injection(driver):
    LoginPage(driver).login("' OR 1=1 --", "admin")
    assert "Invalid credentials" in driver.page_source

# TC_043
def test_xss_attack(driver):
    LoginPage(driver).login("<script>alert(1)</script>", "test")
    assert "Invalid credentials" in driver.page_source
