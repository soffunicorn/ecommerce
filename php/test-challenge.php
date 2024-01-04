<?php
function processItems($p, $o, $ext) {
    // $p: Represents a special product or a specific item being sought in the order.
    // $o: Represents the order. Expected to be an associative array containing information about the items in the order.
    // $ext: Represents additional or extended information related to product prices and quantities.
    //       Expected to be an array containing additional information about the products, especially their prices and extended quantities.

    // Initialize an empty array to store processed items
    $items = [];

    // Flags to track whether specific conditions are met
    $sp = false; // Flag for the special product
    $cd = false; // Flag for deleted product

    // Create an associative array to store extended prices and quantities
    $ext_p = [];

    // Populate the ext_p array with extended prices and quantities
    foreach ($ext as $i => $e) {
        $ext_p[$e['price']['id']] = $e['qty'];
    }

    // Iterate through each item in the order
    foreach ($o['items']['data'] as $i => $item) {
        // Initialize a product array for the current item
        $product = [
            'id' => $item['id']
        ];

        // Check if the current item has an extended quantity
        if (isset($ext_p[$item['price']['id']])) {
            $qty = $ext_p[$item['price']['id']];
            if ($qty < 1) {
                $product['deleted'] = true;
            } else {
                $product['qty'] = $qty;
            }
            unset($ext_p[$item['price']['id']]);
        }
        // Check if the current item matches the special product
        else if ($item['price']['id'] == $p['id']) {
            $sp = true;
        }
        // If none of the above conditions are met, mark the product as deleted
        else {
            $product['deleted'] = true;
            $cd = true;
        }

        // Add the processed product to the items array
        $items[] = $product;
    }

    // If the special product is not in the order, add it with a quantity of 1
    if (!$sp) {
        $items[] = [
            'id' => $p['id'],
            'qty' => 1
        ];
    }

    // Process any remaining extended prices and quantities
    foreach ($ext_p as $i => $qty) {
        if ($qty < 1) {
            continue;
        }

        $items[] = [
            'id' => $i,
            'qty' => $qty
        ];
    }

    // Return the array of processed items
    return $items;
}
?>

Description:

The processItems function is designed to handle and process items in an order based on specific conditions and additional extended information. It takes three parameters: $p representing a special product or a specific item sought in the order, $o representing the order (an associative array containing information about the items), and $ext representing additional information about product prices and quantities (an array).

The function initializes an empty array ($items) to store processed items and sets flags ($sp and $cd) to track whether specific conditions are met. Additionally, it creates an associative array ($ext_p) to store extended prices and quantities by iterating through the $ext array.

In the main iteration through order items, the function processes each item, checking for extended quantities, matching the special product, or marking the product as deleted. Processed products are added to the $items array.

After processing order items, the function checks if the special product is in the order. If not, it adds the special product to $items with a quantity of 1.

Remaining extended prices and quantities are processed, and the function returns the array of processed items ($items).



2) Write a class "LetterCounter" and implement a static method "CountLettersAsString" which receives a string parameter and returns a string that shows how many times each letter shows up in the string by using an asterisk (*).
Example: "Interview" -> "i:**,n:*,t:*,e:**,r:*,v:*,w:*"

<?php
class LetterCounter {
    public static function CountLettersAsString($inputString) {
        // Initialize an associative array to store letter counts
        $letterCounts = [];

        // Convert the string to lowercase to make the counting case-insensitive
        $lowercaseString = strtolower($inputString);

        // Iterate through each character in the string
        for ($i = 0; $i < strlen($lowercaseString); $i++) {
            $char = $lowercaseString[$i];

            // Check if the character is a letter
            if (ctype_alpha($char)) {
                // Increment the count for the current letter
                if (isset($letterCounts[$char])) {
                    $letterCounts[$char]++;
                } else {
                    $letterCounts[$char] = 1;
                }
            }
        }

        // Build the result string with letter counts represented by asterisks
        $resultString = '';
        foreach ($letterCounts as $letter => $count) {
            $resultString .= "$letter:$count*";
        }

        // Remove the trailing asterisk
        $resultString = rtrim($resultString, '*');

        return $resultString;
    }
}

?>




3) Write a method that triggers a request to http://date.jsontest.com/, parses the json response and prints out the current date in a readable format as follows: Monday 14th of August, 2023 - 06:47 PM

<?php
function printFormattedDate() {
    // Make a request to http://date.jsontest.com/ and get the JSON response
    $jsonResponse = file_get_contents('http://date.jsontest.com/');

    // Decode the JSON response
    $data = json_decode($jsonResponse, true);

    // Check if decoding was successful
    if ($data !== null) {
        // Extract the date and time from the response
        $dateString = $data['date'];
        $timeString = $data['time'];

        // Create a DateTime object from the date and time strings
        $dateTime = DateTime::createFromFormat('m-d-Y h:i:s A', "$dateString $timeString");

        // Format the date as desired (Monday 14th of August, 2023 - 06:47 PM)
        $formattedDate = $dateTime->format('l jS \of F, Y - h:i A');

        // Print the formatted date
        echo $formattedDate;
    } else {
        // Handle the case where JSON decoding fails
        echo "Error decoding JSON response.";
    }
}

// Example usage:
printFormattedDate();
?>



4) Write a method that triggers a request to http://echo.jsontest.com/john/yes/tomas/no/belen/yes/peter/no/julie/no/gabriela/no/messi/no, parse the json response.
Using that data print two columns of data. The left column should contain the names of the persons that responses 'no',
and the right column should contain the names that responded 'yes'

<?php
function printResponseColumns() {
    // Make a request to http://echo.jsontest.com/john/yes/tomas/no/belen/yes/peter/no/julie/no/gabriela/no/messi/no
    // and get the JSON response
    $jsonResponse = file_get_contents('http://echo.jsontest.com/john/yes/tomas/no/belen/yes/peter/no/julie/no/gabriela/no/messi/no');

    // Decode the JSON response
    $data = json_decode($jsonResponse, true);

    // Check if decoding was successful
    if ($data !== null) {
        // Initialize two arrays for 'yes' and 'no' responses
        $yesResponses = [];
        $noResponses = [];

        // Iterate through the data and categorize names based on responses
        foreach ($data as $name => $response) {
            if ($response === 'yes') {
                $yesResponses[] = $name;
            } elseif ($response === 'no') {
                $noResponses[] = $name;
            }
        }

        // Print the two columns of data
        echo "Names with 'no' responses:\n";
        foreach ($noResponses as $name) {
            echo $name . "\n";
        }

        echo "\nNames with 'yes' responses:\n";
        foreach ($yesResponses as $name) {
            echo $name . "\n";
        }
    } else {
        // Handle the case where JSON decoding fails
        echo "Error decoding JSON response.";
    }
}

// Example usage:
printResponseColumns();
?>


