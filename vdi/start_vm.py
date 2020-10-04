import argparse
import virtualbox
import time

parser = argparse.ArgumentParser()
parser.add_argument('-i', type=str, help="virtual machine id that will be started")
args = parser.parse_args()
vmID = args.i

vbox = virtualbox.VirtualBox()
session = virtualbox.Session()
vm = vbox.find_machine(vmID)
# change too vm.launch_vm_process(session, "headless") for no GUI
progress = vm.launch_vm_process(session, "gui", "")
progress.wait_for_completion()
print('Started virtual machine "' + vmID + '" successfully')
