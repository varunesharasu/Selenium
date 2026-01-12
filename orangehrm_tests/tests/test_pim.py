from selenium.webdriver.common.by import By
from pages.login_page import LoginPage

def login(driver):
    LoginPage(driver).login("Admin", "admin123")

# TC_026
def test_view_employee_list(driver):
    login(driver)
    driver.find_element(By.LINK_TEXT, "PIM").click()
    assert "Employee List" in driver.page_source

# TC_027
def test_add_employee_button(driver):
    login(driver)
    driver.find_element(By.LINK_TEXT, "PIM").click()
    driver.find_element(By.XPATH, "//button[text()=' Add ']").click()
    assert "Add Employee" in driver.page_source

# TC_028
def test_add_employee_without_name(driver):
    login(driver)
    driver.find_element(By.LINK_TEXT, "PIM").click()
    driver.find_element(By.XPATH, "//button[text()=' Add ']").click()
    driver.find_element(By.XPATH, "//button[@type='submit']").click()
    assert "Required" in driver.page_source
