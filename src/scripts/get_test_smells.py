import sys
import os
import csv

#The list of flaky tests and the list of smells are combined into a new list with the following
#format: Project name/Method name/Is flaky/Test smell 1/Test smell 2/Test smell N
def combine_lists(smell_file, flaky_list_file):
    combined_list = [["Project name", "Test method name", "Is flaky", "Assertion Roulette", "Conditional Test Logic",
    "Constructor Initialization", "Default Test", "Dependent Test", "Duplicate Assert", "Eager Test", "EmptyTest", 
    "Exception Catching Throwing", "General Fixture", "IgnoredTest", "Lazy Test", "Magic Number Test",
    "Mystery Guest", "Print Statement", "Redundant Assertion", "Resource Optimism", "Sensitive Equality",
    "Sleepy Test", "Unknown Test", "Verbose Test"]]
    with open(flaky_list_file, 'r') as csv_file:
        reader = csv.reader(csv_file)
        for i, row in enumerate(reader):
            row.extend([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            combined_list.append(row)
        csv_file.close()

    with open(smell_file, 'r') as csv_file:
        reader = csv.reader(csv_file)
        for i, row in enumerate(reader):
            if i != 0:
                split_row = row[0].split(";")
                method_name = split_row[8] #Method where the smell has been found
                smell_name = split_row[7] #Type of smell
                if smell_name != "testSmellName":
                    smell_index = combined_list[0].index(smell_name) #Column index of that smell
                    for element in combined_list: #The list of methods is checked
                        if method_name == element[1]: #When the method is found
                            element[smell_index] = 1 #The column with the smell found is put to 1
        csv_file.close()

    print("Lists combined!")
    return combined_list

#The combined list is saved into a new csv file
def save_combined_list(parsed_file):
    with open("./src/csv/sfa_results.csv", "w", newline = '') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerows(parsed_file)
        csv_file.close()

    print("Result written in jnose_results.csv!")

if len(sys.argv) == 1:
    print("No file provided! Please, provide the path of the file to be used.") 
elif not os.path.exists(sys.argv[1]):
    print("Incorrect file! Please, provide a valid path for the file to be used.") 
else:
    #The csv file passed as argument is read and parsed
    combined_list = combine_lists(sys.argv[1], sys.argv[2])    

    #The parsed list is saved into a new csv file
    save_combined_list(combined_list)
        