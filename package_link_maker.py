# -*- coding: utf-8 -*-

import os
import glob
import socket
import subprocess

def get_lan():
    """Gets the computer's LAN IP"""
    soc = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        soc.connect(('10.255.255.255', 1))
        lan = str(soc.getsockname()[0])
        soc.close()
    except socket.error:
        soc.close()
        closer('ERROR: Unable to find LAN IP')

    return lan

def main():
    """The main logic"""
myip = get_lan()

host = 'http://'+myip+'/'

content_id = []
pkgs = glob.glob('*.pkg')

for pkg in pkgs:
    os.rename(pkg, pkg.replace(" ","_"))

pkgs = glob.glob('*.pkg')

for pkg in pkgs:
    with open(pkg, "rb") as in_file:
        hfs = "hfs.exe " + pkg
        subprocess.Popen(hfs, shell = False)
        res = in_file.read(48)
        res = in_file.read(36)
        content_id.append(res)

f = open("package_link.xml", "w")
f.write("<XMBML version=\"1.0\">\n"
        "    <View id=\"custom_pkg\">\n"
        "        <Attributes>\n")

for x in range(len(pkgs)):
    f.write("            <Table key=\"custom_pkg_main_" + str(x) + "\">\n"
            "                <Pair key=\"icon\"><String>/dev_usb000/download.png</String></Pair>\n"
            "                <Pair key=\"title\"><String>" + pkgs[x] + "</String></Pair>\n"
            "                <Pair key=\"info\"><String>" + content_id[x][7:16] + "</String></Pair>\n"
            "                <Pair key=\"ingame\"><String>disable</String></Pair>\n"
            "            </Table>\n")

f.write("        </Attributes>\n"
        "        <Items>\n")

for x in range(len(pkgs)):
    f.write("            <Query\n"
            "                class=\"type:x-xmb/folder-pixmap\"\n"
            "                key=\"custom_pkg_main_" + str(x) + "\"\n"
            "                attr=\"custom_pkg_main_" + str(x) + "\"\n"
            "                src=\"#custom_pkg_items_" + str(x) + "\"\n"
            "            />\n")
f.write("        </Items>\n"
        "    </View>\n\n")

for x in range(len(pkgs)):
    f.write("    <View id=\"custom_pkg_items_" + str(x) + "\">\n"
            "        <Attributes>\n"
            "            <Table key=\"link" + str(x) + "\">\n"
            "                <Pair key=\"info\"><String>net_package_install</String></Pair>\n"
            "                <Pair key=\"pkg_src\"><String>"+ host + pkgs[x] + "</String></Pair>\n"
            "                <Pair key=\"pkg_src_qa\"><String>"+ host + pkgs[x] + "</String></Pair>\n"
            "                <Pair key=\"content_name\"><String>tool_pkg_install_pc</String></Pair>\n"
            "                <Pair key=\"content_id\"><String>" + content_id[x] + "</String></Pair>\n"
            "                <Pair key=\"prod_pict_path\"><String>/dev_usb000/download.png</String></Pair>\n"
            "            </Table>\n"
            "        </Attributes>\n"
            "        <Items>\n"
            "            <Item class=\"type:x-xmb/xmlnpsignup\" key=\"link" + str(x) + "\" attr=\"link" + str(x) + "\"/>\n"
            "        </Items>\n"
            "    </View>\n\n")

f.write("</XMBML>")
f.close()

if __name__ == '__main__':
    main()