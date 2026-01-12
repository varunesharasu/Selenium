from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class DashboardPage:
    def __init__(self, driver):
        self.wait = WebDriverWait(driver, 10)

    def is_dashboard_loaded(self):
        return self.wait.until(
            EC.presence_of_element_located((By.XPATH, "//h6[text()='Dashboard']"))
        )
