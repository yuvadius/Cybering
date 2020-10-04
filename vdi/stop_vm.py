import argparse
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument('-i', type=str, help="virtual machine id that will be started")
args = parser.parse_args()
vmID = args.i

# Use "acpipowerbutton" instead of "poweroff" for a safe shut down
subprocess.call(['C:\\Program Files\\Oracle\\VirtualBox\\vboxmanage', 'controlvm', vmID, 'poweroff'])
print('Stopped virtual machine "' + vmID + '" successfully')
