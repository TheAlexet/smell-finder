import sys
import os
import csv

#The initial list of methods is parsed into Project name/Method name/Is flaky
def parse_list(initial_file):
    parsed_list = []
    with open(initial_file, 'r') as csv_file:
        reader = csv.reader(csv_file)
        for i, row in enumerate(reader):
            if i != 0:
                parsed_list.append([row[0], row[1].split('#',1)[1], row[2]])
        csv_file.close()

    print("File parsed!")
    return parsed_list

#The parsed list is saved into a new csv file
def save_parsed_list(parsed_file):
    file_name = os.path.splitext(sys.argv[1])[0]
    with open(file_name + "_parsed.csv", "w", newline = '') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerows(parsed_file)
        csv_file.close()

    print("Result written in " + file_name + "_parsed.csv!")

if len(sys.argv) == 1:
    print("No file provided! Please, provide the path of the file to be used.") 
elif not os.path.exists(sys.argv[1]):
    print("Incorrect file! Please, provide a valid path for the file to be used.") 
else:
    #The csv file passed as argument is read and parsed
    parsed_list = parse_list(sys.argv[1])    

    #The parsed list is saved into a new csv file
    save_parsed_list(parsed_list)
        