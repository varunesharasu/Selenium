from pages.login_page import LoginPage
from pages.dashboard_page import DashboardPage

def login_as_admin(driver):
    LoginPage(driver).login("Admin", "admin123")

# TC_016
def test_dashboard_load(driver):
    login_as_admin(driver)
    assert DashboardPage(driver).is_dashboard_loaded()

# TC_017
def test_dashboard_without_login(driver):
    driver.get("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
    assert "login" in driver.current_url

# TC_018
def test_back_after_logout(driver):
    login_as_admin(driver)
    driver.back()
    assert "dashboard" in driver.current_url
