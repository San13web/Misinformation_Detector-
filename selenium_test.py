from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

# ✅ Path to unpacked Chrome extension
extension_path = r"C:\Users\saniy\OneDrive\Desktop\misinformation-dectector\frontend"

# ✅ Load Chrome with the extension
chrome_options = Options()
chrome_options.add_argument(f"--load-extension={extension_path}")
chrome_options.add_experimental_option("detach", True)

# ✅ Set up Chrome driver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    # ✅ Open Google
    driver.get("https://www.google.com")
    time.sleep(3)

    # ✅ Click the extension icon (update with your actual selector)
    wait = WebDriverWait(driver, 10)
    extension_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "body > div")))  # Change this selector if needed
    extension_button.click()
    time.sleep(3)

    # ✅ Click the scan button inside the popup (update with the correct selector)
    scan_button = driver.find_element(By.CSS_SELECTOR, ".container button")  # Update this selector as needed
    scan_button.click()
    time.sleep(5)

finally:
    driver.quit()
