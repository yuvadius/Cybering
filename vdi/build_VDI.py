import argparse
import subprocess

vboxmanage = 'C:\\Program Files\\Oracle\\VirtualBox\\vboxmanage'

parser = argparse.ArgumentParser()
parser.add_argument('-f', type=argparse.FileType('r'), help="VDI file that will be converted to a virtual machine")
args = parser.parse_args()
fullpath = args.f.name
if fullpath[-4:] != ".vdi":
    raise argparse.ArgumentTypeError("%r is not a .vdi file." % fullpath)
filename = str(fullpath).split('.vdi')[0].split('\\')[-1:][0]

subprocess.call([vboxmanage, 'createvm', '--name', filename, '--ostype', 'Centos_64', '--register'])
subprocess.call([vboxmanage, 'modifyvm', filename, '--memory', '2048'])
subprocess.call([vboxmanage, 'storagectl', filename, '--name', '"SATA Controller"', '--add', 'sata', '--controller', 'IntelAhci'])
subprocess.call([vboxmanage, 'storageattach', filename, '--storagectl', '"SATA Controller"', '--port', '0', '--device', '0', '--type', 'hdd', '--medium', fullpath])
print('Built virtual machine"' + filename + '" successfully')
