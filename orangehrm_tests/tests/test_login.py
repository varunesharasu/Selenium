from pages.login_page import LoginPage
from pages.dashboard_page import DashboardPage

# TC_001
def test_valid_login(driver):
    login = LoginPage(driver)
    login.login("Admin", "admin123")
    dashboard = DashboardPage(driver)
    assert dashboard.is_dashboard_loaded()

# TC_002
def test_invalid_username(driver):
    login = LoginPage(driver)
    login.login("Invalid", "admin123")
    assert "Invalid credentials" in login.get_error()

# TC_003
def test_invalid_password(driver):
    login = LoginPage(driver)
    login.login("Admin", "wrong123")
    assert "Invalid credentials" in login.get_error()

# TC_004
def test_empty_fields(driver):
    login = LoginPage(driver)
    login.login("", "")
    assert "Required" in driver.page_source

# TC_005
def test_empty_username(driver):
    login = LoginPage(driver)
    login.login("", "admin123")
    assert "Required" in driver.page_source

# TC_006
def test_empty_password(driver):
    login = LoginPage(driver)
    login.login("Admin", "")
    assert "Required" in driver.page_source
