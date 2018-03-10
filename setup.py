from cx_Freeze import setup, Executable

setup(
    name = "Package link maker",
    version = "1.0",
    description = "This tool automaticaly scan lan, find pkgs in currentdir, extract content-id from pkgs",
    executables = [Executable("package_link_maker.py")]
)