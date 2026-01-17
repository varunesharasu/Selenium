from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Path to your ChromeDriver
CHROMEDRIVER_PATH = 'chromedriver'  # Update if needed

# URL of your authentication page
URL = 'file:///D:/Projects/Selenium/Authentication/frontend/index.html'

# Test credentials
TEST_USERNAME = 'testuser123'
TEST_PASSWORD = 'testpass123'

def test_register_and_login():
    service = Service(CHROMEDRIVER_PATH)
    driver = webdriver.Chrome(service=service)
    driver.get(URL)
    driver.maximize_window()
    wait = WebDriverWait(driver, 10)

    # Register
    register_tab = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Register')]")))
    register_tab.click()
    wait.until(EC.visibility_of_element_located((By.ID, 'registerForm')))
    driver.find_element(By.ID, 'regUsername').send_keys(TEST_USERNAME)
    driver.find_element(By.ID, 'regPassword').send_keys(TEST_PASSWORD)
    driver.find_element(By.CSS_SELECTOR, '#registerForm button[type="submit"]').click()
    # Wait for registration message
    reg_msg = wait.until(EC.visibility_of_element_located((By.ID, 'registerMsg')))
    assert 'successful' in reg_msg.text.lower()
    time.sleep(1)

    # Login
    login_tab = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Login')]")))
    login_tab.click()
    wait.until(EC.visibility_of_element_located((By.ID, 'loginForm')))
    driver.find_element(By.ID, 'loginUsername').send_keys(TEST_USERNAME)
    driver.find_element(By.ID, 'loginPassword').send_keys(TEST_PASSWORD)
    driver.find_element(By.CSS_SELECTOR, '#loginForm button[type="submit"]').click()
    # Wait for redirect to dashboard
    wait.until(EC.url_contains('dashboard.html'))
    # Check username on dashboard
    dash_user = wait.until(EC.visibility_of_element_located((By.ID, 'dashboardUsername')))
    assert TEST_USERNAME in dash_user.text
    print('Test passed: Register and Login flow works!')
    driver.quit()

if __name__ == '__main__':
    test_register_and_login()
