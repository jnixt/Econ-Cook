import sys, subprocess

def install_package(package):
    try:
        #: python -m pip install <package_masukan>
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        print(f"Successfully installed {package}")
    except subprocess.CalledProcessError as e:
        print(f"Failed to install {package}. Error: {e}")

if __name__ == "__main__":
    package_list = ["flask", "flask-cors", "sqlalchemy", "werkzeug", "jwt"]
    for package in package_list:
        install_package(package)